export async function POST(request: Request) {

    console.log(JSON.stringify(request));

    return new Response(JSON.stringify({
        "message": "Hello, World!"
    }), {
        headers: {
            "content-type": "application/json"
        }
    });
}