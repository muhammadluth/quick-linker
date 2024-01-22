import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { IIDParams } from "@/lib/model";

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
