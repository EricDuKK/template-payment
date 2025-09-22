import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => {
          return cookieStore.get(name)?.value;
        },
        set: (name, value, options) => {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // 在某些情况下，Cookie 无法设置（例如静态生成）
            console.error("Failed to set cookie:", error);
          }
        },
        remove: (name, options) => {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.error("Failed to remove cookie:", error);
          }
        },
      },
    }
  );
}

// 管理员操作的客户端（使用 service_role_key）
export function createServerAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// 使用管理员权限示例
// const adminAuthClient = createServerAdminClient().auth.admin
