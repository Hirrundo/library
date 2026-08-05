export interface IBookHistory {
bookId: string;
takenAt: Date;
returnedAt?: Date;

}
interface IActiveBook {
bookId: string;
title: string;
author: string;
issuedDate: Date;
}

export interface IReader {
id: string;
fullName: string;
email: string;
phone: string;
registrationDate: Date;
booksHistory: IBookHistory[];
activeBooks: IActiveBook [];
}