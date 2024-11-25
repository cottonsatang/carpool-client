type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type Category = {
    [key in MarkerColor]: string;
};

interface ImageUri {
    id?: number;
    uri: string;
}

interface Marker {
    id: number;
    latitude: number;
    longitude: number;
    color: MarkerColor;
    score: number;
}

interface Post extends Marker {
    title: string;
    address: string;
    date: Date | string;
    description: string;
}

interface Profile {
    id: number;
    email: string;
    name: string | null;
    imageUrl: string | null;
    loginType: 'name';
}

export type {MarkerColor, Category, Post, ImageUri, Profile ,Marker};