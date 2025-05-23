import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const query = body.query;
  const sort = body.sort as "asc" | "desc" | undefined;
  const page = body.page as string | undefined;

  console.log(`REQUEST:`, query, sort, page);

  if (!query) {
    return NextResponse.json({ error: "Empty Request..." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&${sort ? `order=${sort}` : ""}${page ? `&page=${page}` : ""}`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    const data = await response.json();
    console.log(`RESPONSE LENGTH:`, data.items.length);

    return NextResponse.json({
      total_count: data.total_count,
      items: data.items,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "GitHub API request failed." }, { status: 500 });
  }
}
