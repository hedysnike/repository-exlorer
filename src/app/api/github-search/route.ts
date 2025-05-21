import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const query = body.query;
  const sort = body.sort;

  if (!query) {
    return NextResponse.json({ error: "Empty Request..." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    const data = await response.json();

    console.log(data.items[0].owner);

    return NextResponse.json({
      total: data.total_count,
      repos: data.items,
    });
  } catch (err) {
    return NextResponse.json({ error: "GitHub API request failed." }, { status: 500 });
  }
}
