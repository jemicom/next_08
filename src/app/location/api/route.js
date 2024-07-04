// pages/api/addPost.js
export async function POST(request) {
    try {
      const formData = await request.formData();
  
      const title = formData.get("title");
      const desc = formData.get("desc");
      const slug = formData.get("slug");
      const userId = formData.get("userId");
  
      console.log("Title:", title);
      console.log("Description:", desc);
      console.log("Slug:", slug);
      console.log("User ID:", userId);
  
      // 여기서 데이터베이스 저장 등 추가 작업을 수행할 수 있습니다.
  
      // 리디렉션 응답 반환
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/form',
        },
      });
    } catch (error) {
      console.error("Error processing form data:", error);
  
      // 에러 응답 반환
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
  