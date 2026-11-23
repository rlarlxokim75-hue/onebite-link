"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { signInWithKakao, type KakaoLoginState } from "@/app/actions";
import Toast from "@/components/common/toast";

const initialState: KakaoLoginState = { status: "idle" };

/** 카카오 공식 로그인 버튼 이미지를 사용한 소셜 로그인 버튼 */
export default function KakaoLoginButton() {
  const [state, formAction, pending] = useActionState(
    async () => signInWithKakao(),
    initialState,
  );
  const [dismissedKey, setDismissedKey] = useState<number>();

  const showToast =
    state.status === "error" && state.key !== dismissedKey && !!state.message;

  return (
    <>
      {showToast && (
        <Toast
          message={state.message!}
          onClose={() => setDismissedKey(state.key)}
        />
      )}
      <form action={formAction}>
        <button
          type="submit"
          disabled={pending}
          aria-label="카카오 로그인"
          className="block w-full overflow-hidden rounded-xl transition-[filter,transform] duration-200 hover:brightness-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Image
            src="/kakao_login_large_wide.png"
            alt=""
            width={600}
            height={90}
            className="h-auto w-full"
            priority
          />
        </button>
      </form>
    </>
  );
}
