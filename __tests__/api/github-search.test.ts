import { POST } from '@/app/api/github-search/route';
import { NextRequest } from 'next/server';
import { Readable } from 'stream';

global.fetch = jest.fn();

function createNextRequest(body: any): NextRequest {
  const readable = Readable.from([JSON.stringify(body)]);
  return new NextRequest('http://localhost/api/github-search', {
    method: 'POST',
    body: readable as any,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

describe('/api/github-search', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('უნდა დააბრუნოს სტატუსი 400 და შედეგი უნდა იყოს {"error": "Empty Request..."}', async () => {
    const req = createNextRequest({});
    const res = await POST(req);
    const result = await res.json();

    expect(res.status).toBe(400);
    expect(result).toEqual({ error: 'Empty Request...' });
  });

  it('უნდა დააბრუნოს repository-ების და სტატუსი 200', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        total_count: 1,
        items: [
          {
            id: 1,
            name: 'nextjs',
            full_name: 'vercel/next.js',
            description: 'The React Framework',
            stargazers_count: 100000,
          },
        ],
      }),
    });

    const req = createNextRequest({
      query: 'nextjs',
    });

    const res = await POST(req);
    const result = await res.json();

    expect(res.status).toBe(200);
    expect(result.total_count).toBe(1);
    expect(Array.isArray(result.items)).toBe(true);
    expect(result.items[0].name).toBe('nextjs');
  });
});
