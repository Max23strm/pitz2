"use server"
import { Button, Container, Text } from '@mantine/core'
import Link from 'next/link'
// import NotFoundPage from '../components/NotFoundPage'
import NotFoundPage from '@/app/components/NotFoundPage'
 
export default async function NotFound() {
  return <NotFoundPage/>
}