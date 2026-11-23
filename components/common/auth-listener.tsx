"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

/** 로그인 계정이 바뀌면(다른 탭에서의 로그인/로그아웃 포함) 서버 데이터를 처음부터 다시 불러온다 */
export default function AuthListener() {
  const router = useRouter();

  useEffect(() => {
    let currentUserId: string | null | undefined;
    const {
      data: { subscription },
    } = createClient().auth.onAuthStateChange((_event, session) => {
      const userId = session?.user.id ?? null;
      // 첫 이벤트는 기준값만 저장
      if (currentUserId !== undefined && currentUserId !== userId) {
        router.refresh();
      }
      currentUserId = userId;
    });
    return () => subscription.unsubscribe();
  }, [router]);

  return null;
}
