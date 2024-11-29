import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteRoute {
  id: string;
  startPoint: string;
  endPoint: string;
}

const FAVORITES_STORAGE_KEY = 'FAVORITES_ROUTES';

const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteRoute[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  // 즐겨찾기 데이터 로드
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  // 즐겨찾기 추가
  const addFavorite = async (route: FavoriteRoute) => {
    try {
      const updatedFavorites = [...favorites, route];
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Failed to add favorite:', error);
    }
  };

  // 즐겨찾기 삭제
  const removeFavorite = async (routeId: string) => {
    try {
      const updatedFavorites = favorites.filter((route) => route.id !== routeId);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  // 즐겨찾기 존재 여부 확인
  const isFavorite = (routeId: string) => {
    return favorites.some((route) => route.id === routeId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};

export default useFavorites;
