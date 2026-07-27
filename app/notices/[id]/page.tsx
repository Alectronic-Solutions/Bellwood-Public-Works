import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { notices } from "@/content/notices";
import { NoticeDetail } from "@/components/notices/NoticeDetail";

interface NoticePageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return notices.map((notice) => ({ id: notice.id }));
}

export function generateMetadata({ params }: NoticePageProps): Metadata {
  const notice = notices.find((item) => item.id === params.id);
  return { title: notice ? notice.title : "Notice" };
}

export default function NoticePage({ params }: NoticePageProps) {
  const notice = notices.find((item) => item.id === params.id);

  if (!notice) {
    notFound();
  }

  return <NoticeDetail notice={notice} />;
}
