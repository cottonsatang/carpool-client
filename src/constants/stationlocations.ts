export interface StationLocation {
    id: number;
    name: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    address: string;
}

const StationLocations: StationLocation[] = [
    {
        id: 0,
        name: '명지대 자연캠퍼스',
        coordinate: { latitude: 37.222691, longitude: 127.190167 },
        address: '경기도 용인시 처인구 명지로 116 (남동)'
    },
    {
        id: 1,
        name: '명지대역',
        coordinate: { latitude: 37.238068, longitude: 127.190282 },
        address: '경기도 용인시 처인구 금학로 241 (역북동 484-10)'
    },
    {
        id: 2,
        name: '용인공용버스터미널',
        coordinate: { latitude: 37.232759, longitude: 127.209617 },
        address: '경기도 용인시 처인구 중부대로 1486 (김량장동)'
    },
    {
        id: 3,
        name: '동백역',
        coordinate: { latitude: 37.269777, longitude: 127.151617 },
        address: '경기도 용인시 기흥구 동백죽전대로 314 (중동)'
    },
    {
        id: 4,
        name: '기흥역',
        coordinate: { latitude: 37.276003, longitude: 127.116782 },
        address: '경기도 용인시 기흥구 중부대로 지하460 (구갈동 227-25)'
    },
];

export default StationLocations;
