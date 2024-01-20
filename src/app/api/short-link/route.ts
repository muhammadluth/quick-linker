import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { IResponseGetShortLink } from "@/lib/interface";


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
    return NextResponse.json({ message: "success create short link" }, { status: 201 });
}

export async function GET(req: Request) {
    const response = await prisma.shortLink.findMany({
        // skip:"",
        // take: "",
    });
    if (response) {
        const data: IResponseGetShortLink = {
            base_url: req.headers.get("referer"),
            short_link_data: response
        }
        return NextResponse.json(data, { status: 200 });
    } else {
        return NextResponse.json({ message: "error data not found" }, { status: 404 });
    }
}