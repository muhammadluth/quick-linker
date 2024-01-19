import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { IIDParams } from "@/lib/interface";

export async function GET(req: Request, { params: { id } }: IIDParams) {
    const response = await prisma.shortLink.findUnique({
        where: {
            destinationLink: id,
        },
    });
    if (response) {
        return NextResponse.json(response, { status: 200 });
    } else {
        return NextResponse.json({ message: "data short link not found" }, { status: 404 });
    }
}
