export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-600 mb-6">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
} 