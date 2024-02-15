export const URL_BASE = 'https://jsonplaceholder.typicode.com/';

export interface Post {
    body: string;
    id: number;
    title: string;
    userId: number;
}


export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface DataSnackBarInfo {
    text: string;
    /**mi possono servire altre?
     * colorSnackBar ?
     * callBack ?
    */

}

export interface TypeViewsPost {
    value: ValueTypeViewPost,
    name?: string,
    icon: string,

}

export type ValueTypeViewPost = 'wrap' | 'column';

export interface DataDialog {
    titlePost: string;
    bodyPost: string;
    user: User;
    mobile: boolean
}

export const toggleMemory = 'toggleV-';

export const viewTypeMemory = 'viewMemoryV-';
