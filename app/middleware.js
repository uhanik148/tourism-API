// app/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  // Implementasi logika middleware
  console.log('Middleware diaktifkan');
  return NextResponse.next();
}