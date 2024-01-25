import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { IIDParams } from "@/lib/model";

const regexURL: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export async function GET(req: Request, { params: { id } }: IIDParams) {
    const response = await prisma.shortLink.findUnique({
        where: {
            destinationLink: id,
        },
    });
    if (response) {
        return NextResponse.json(response, { status: 200 });
    } else {
        return NextResponse.json({ message: "error data not found" }, { status: 404 });
    }
}


export async function DELETE(req: Request, { params: { id } }: IIDParams) {
    await prisma.shortLink.delete({
        where: {
            id: id,
        },
    });
    return NextResponse.json({ message: "success delete short link" }, { status: 200 });
}


export async function PUT(req: Request, { params: { id } }: IIDParams) {
    const { name, sourceLink, updatedAt } = await req.json();

    if (!regexURL.test(sourceLink)) {
        throw new Error("invalid source link");
    }
    await prisma.shortLink.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            sourceLink: sourceLink,
            updatedAt: updatedAt
        },
    });
    return NextResponse.json({ message: "success update short link" }, { status: 201 });
}
