// import { http, HttpResponse } from 'msw'

// export const handlers = [
//   http.get('/api/user', () => {
//     console.log('MSW intercepted /api/user request');
//     return HttpResponse.json({
//       id: 1,
//       name: '홍길동',
//       email: 'hong@example.com'
//     }, { status: 200 })
//   }),

//   http.all('*', ({ request }) => {
//     console.log('MSW intercepted unhandled request:', request.url);
//     return HttpResponse.json({ message: 'Unhandled request' }, { status: 404 })
//   })
// ]