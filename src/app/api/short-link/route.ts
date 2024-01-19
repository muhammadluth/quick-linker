import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


const regexURL: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export async function POST(req: Request) {
    const { name, sourceLink, destinationLink } = await req.json();

    if (!regexURL.test(sourceLink)) {
        throw new Error("invalid source link");
    }
    await prisma.shortLink.create({
        data: {
            name: name,
            sourceLink: sourceLink,
            destinationLink: destinationLink,
        },
    });
    return NextResponse.json({ message: "created short link" }, { status: 200 });
}