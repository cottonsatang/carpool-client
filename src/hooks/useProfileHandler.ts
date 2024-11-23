import { useState, useEffect } from "react";
import { useAuth } from "./queries/useAuth";

interface VehicleInfo {
  model?: string;
  licensePlate?: string;
  seatingCapacity?: string;
}

interface ProfileData {
  role: string;
  email: string;
  name: string;
  phoneNumber: string;
  vehicleInfo?: VehicleInfo | null;
}

export function useProfileHandler() {
  const { getProfileQuery, signupMutation } = useAuth();

  // 초기 프로필 데이터 설정
  const profileData: ProfileData = getProfileQuery.data || {
    role: "탑승자",
    email: "",
    name: "",
    phoneNumber: "",
    vehicleInfo: null,
  };

  const [phoneNumber, setPhoneNumber] = useState(profileData.phoneNumber);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>(
    profileData.vehicleInfo || {}
  );
  const [initialState, setInitialState] = useState({
    phoneNumber: profileData.phoneNumber,
    vehicleInfo: profileData.vehicleInfo || {},
  });

  // 프로필 데이터 로드
  useEffect(() => {
    setPhoneNumber(profileData.phoneNumber);
    setVehicleInfo(profileData.vehicleInfo || {});
    setInitialState({
      phoneNumber: profileData.phoneNumber,
      vehicleInfo: profileData.vehicleInfo || {},
    });
  }, [profileData]);

  // 저장 로직
  const saveChanges = async (): Promise<{ success: boolean; message: string }> => {
    try {
      const updateData: any = { phoneNumber };
      if (profileData.role === "운전자") {
        updateData.vehicleInfo = vehicleInfo;
      }
      await signupMutation.mutateAsync(updateData);
      getProfileQuery.refetch();
      return { success: true, message: "변경이 저장되었습니다." };
    } catch (error) {
      console.error(error);
      return { success: false, message: "변경 저장에 실패했습니다." };
    }
  };

  // 취소 로직
  const cancelChanges = () => {
    setPhoneNumber(initialState.phoneNumber);
    setVehicleInfo(initialState.vehicleInfo);
  };

  return {
    profileData,
    phoneNumber,
    vehicleInfo,
    setPhoneNumber,
    setVehicleInfo,
    saveChanges,
    cancelChanges,
  };
}
