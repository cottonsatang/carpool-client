import React, { useRef, useState } from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {LatLng, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import { colors } from '../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import stationlocations from "../../constants/stationlocations";
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '../../navigations/stack/MapStackNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '../../navigations/drawer/MainDrawerNavigator';
import useUserLocation from '../../hooks/useUserLocation';
import usePermission from '../../hooks/usePermission';
import mapStyle from '../../style/mapStyle';
import CustomMarker from "../../components/CustomMarkers";
import stationLocations from "../../constants/stationlocations";
import BottomDrawer from "../../components/BottomDrawer";
import MarkerModal from "../../components/MarkerModal";
import useMatching, {useGetMatchingStatus} from "../../hooks/queries/useMatching";

type Navigation = CompositeNavigationProp<
    StackNavigationProp<MapStackParamList>,
    DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<Navigation>();
    const mapRef = useRef<MapView | null>(null);
    const { userLocation, isUserLocationError } = useUserLocation();
    const [startPoint, setStartPoint] = useState<number | null>(null);
    const [endPoint, setEndPoint] = useState<number | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false); // 바텀 드로워 표시 상태
    const [isMatching, setIsMatching] = useState(false);
    const [matchId, setMatchId] = useState<string | null>(null);
    const { requestMatchingMutation, cancelMatchingMutation } = useMatching();
    const { data: matchingStatus } = useGetMatchingStatus(matchId ?? '', {
        enabled: !!matchId,
    });

    usePermission('LOCATION');

    const moveMapView = (coordinate: LatLng) => {
        mapRef.current?.animateToRegion({
            ...coordinate,
            longitudeDelta: 0.0922,
            latitudeDelta: 0.0421,
        });
    }

    const handlePressUserLocation = () => {
        if (isUserLocationError) {
            console.warn("User location error");
            return;
        }
        moveMapView(userLocation);
    };

    const handleMarkerPress = (
      coordinate: {latitude: number; longitude: number},
      id: number,
    ) => {
      setSelectedMarker(id);
      setIsModalVisible(true);
    };

    const handleSetStart = () => {
        setStartPoint(selectedMarker);
        Alert.alert('출발지 설정', `${stationLocations[selectedMarker!].name}이(가) 출발지로 설정되었습니다.`);
        setIsModalVisible(false);
    };

    const handleSetEnd = () => {
        setEndPoint(selectedMarker);
        Alert.alert('도착지 설정', `${stationLocations[selectedMarker!].name}이(가) 도착지로 설정되었습니다.`);
        setIsModalVisible(false);
    };

    const handleMatchRequest = async () => {
        if (startPoint === null || endPoint === null) {
            Alert.alert('오류', '출발지와 도착지를 모두 설정해주세요.');
            return;
        }
        try {
            const response = await requestMatchingMutation.mutateAsync({
                startPoint,
                endPoint,
                requestTime: new Date().toISOString(),
            });

            setMatchId(response.matchId);
            setIsMatching(true);
            setIsDrawerVisible(false);
            Alert.alert('매칭 요청', '매칭이 요청되었습니다.');
        } catch (error) {
            Alert.alert(
                '오류',
                error instanceof Error ? error.message : '매칭 요청 중 문제가 발생했습니다.'
            );
        }
    };

    const handleReset = () => {
        setStartPoint(null);
        setEndPoint(null);
        setIsDrawerVisible(false);
        setIsMatching(false);  // 매칭 상태 초기화
        Alert.alert('초기화 완료', '출발지와 도착지가 초기화되었습니다.');
    };

    const handleCancel = async () => {
        try {
            if (isMatching && matchId) {
                await cancelMatchingMutation.mutateAsync(matchId);
                Alert.alert('매칭 취소', '매칭이 취소되었습니다.');
            }
            // 모든 상태 초기화
            setStartPoint(null);
            setEndPoint(null);
            setIsDrawerVisible(false);
            setIsMatching(false);
            setMatchId(null);
        } catch (error) {
            Alert.alert(
                '오류',
                error instanceof Error ? error.message : '매칭 취소 중 문제가 발생했습니다.'
            );
        }
    };

    const getSelectedCoordinates = () => {
        if (startPoint !== null && endPoint !== null) {
            const start = stationLocations[startPoint].coordinate;
            const end = stationLocations[endPoint].coordinate;
            return [start, end];
        }
        return [];
    };

    const handleSelectStation = (type: 'start' | 'end') => {
        // 스테이션 선택을 처리하는 로직
        console.log(`Station selection initiated for ${type}`);
    };

    return (
        <>
            <MapView
                ref={mapRef}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={false}
                customMapStyle={mapStyle}>
                {stationlocations.map((location) => (
                    <CustomMarker
                        key={location.id}
                        coordinate={location.coordinate}
                        name={location.name} // name prop 추가
                        color={
                            startPoint === location.id
                                ? 'RED'
                                : endPoint === location.id
                                    ? 'YELLOW'
                                    : 'BLUE'
                        }
                        onPress={() => handleMarkerPress(location.coordinate ,location.id)}
                    />
                ))}
                {startPoint !== null && endPoint !== null && (
                    <Polyline
                        coordinates={getSelectedCoordinates()}
                        strokeColor={colors.BLUE_500} // 선 색상
                        strokeWidth={3}              // 선 두께
                    />
                )}
            </MapView>
            <Pressable
                style={[styles.drawerButton, { top: inset.top || 20 }]}
                onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" color={colors.WHITE} size={25} />
            </Pressable>
            <View style={styles.buttonList}>
                <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
                    <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
                </Pressable>
                <Pressable
                    style={[
                        styles.resetButton,
                        isMatching && styles.disabledButton,
                    ]}
                    onPress={handleReset}
                    disabled={isMatching} // 매칭 중일 때 비활성화
                >
                    <MaterialIcons name="refresh" color={colors.WHITE} size={25} />
                </Pressable>
            </View>
            {(startPoint !== null && endPoint !== null) && (
                <Pressable
                    style={[
                        styles.matchingStartButton,
                        isMatching && styles.matchingInProgressButton
                    ]}
                    onPress={() => setIsDrawerVisible(true)}
                >
                    <Text style={styles.matchingStartText}>
                        {isMatching ? '매칭 중입니다' : '매칭 시작하기'}
                    </Text>
                    <MaterialIcons
                        name={isMatching ? "hourglass-empty" : "send"}
                        color={colors.WHITE}
                        size={25}
                    />
                </Pressable>
            )}
            <MarkerModal
                visible={isModalVisible}
                name={
                    selectedMarker !== null && stationLocations[selectedMarker]
                        ? stationLocations[selectedMarker].name
                        : 'Unknown'
                }
                address={
                    selectedMarker !== null && stationLocations[selectedMarker]
                        ? stationLocations[selectedMarker].address
                        : '주소 정보 없음'
                }
                onClose={() => setIsModalVisible(false)}
                onSetStart={handleSetStart}
                onSetEnd={handleSetEnd}
            />
            <BottomDrawer
                isVisible={isDrawerVisible}
                startPoint={startPoint}
                endPoint={endPoint}
                stations={stationLocations}
                onSelectStation={handleSelectStation}
                onCancel={isMatching ? handleCancel : () => setIsDrawerVisible(false)}
                onMatchStart={handleMatchRequest}
                isMatching={isMatching}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerButton: {
        position: 'absolute',
        left: 0,
        top: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: colors.BLUE_500,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 1, height: 1 },
        elevation: 5,
    },
    buttonList: {
        position: 'absolute',
        bottom: 30,
        right: 15,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    mapButton: {
        backgroundColor: colors.BLUE_500,
        marginVertical: 5,
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        elevation: 2,
    },
    matchingStartButton: {
        position: 'absolute',
        bottom: 30,
        width: '50%',
        alignSelf: 'center',
        backgroundColor: colors.BLUE_500,
        paddingVertical: 12,  // 상하 패딩 줄임
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    matchingStartText: {
        color: colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    resetButton: {
        backgroundColor: colors.RED_500,
        marginVertical: 5,
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        elevation: 2,
    }, matchingInProgressButton: {
        backgroundColor: colors.BLUE_ACTIVE,  // 매칭 중일 때는 회색으로 변경
    },
    disabledButton: {
        backgroundColor: colors.GRAY_300, // 비활성화된 버튼 색상
    },
});

export default MapHomeScreen;
