"use client";

import { Button, Empty, Spin, Tag, message } from "antd";
import { Bell, CheckCheck, MailOpen } from "lucide-react";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from "@/src/hooks/use-notifications";

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("uz-UZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function typeLabel(type: string, entityType?: string | null) {
  if (entityType === "SupportTicket" || type === "YANGI_MUROJAAT") {
    return "Murojaat";
  }
  if (entityType === "Complaint" || type === "YANGI_SHIKOYAT") {
    return "Shikoyat";
  }
  if (type.includes("BRON")) return "Bron";
  if (type.includes("TOLOV")) return "To‘lov";
  return "Xabar";
}

export default function XabarlarInbox({
  roleLabel,
}: {
  roleLabel: string;
}) {
  const { data, isLoading, isError, refetch } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();

  const items = data?.items ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const onMarkRead = async (id: string, isRead: boolean) => {
    if (isRead) return;
    try {
      await markRead.mutateAsync(id);
    } catch {
      message.error("Xabarni o‘qilgan qilib bo‘lmadi");
    }
  };

  const onMarkAll = async () => {
    try {
      await markAll.mutateAsync();
      message.success("Barcha xabarlar o‘qildi");
    } catch {
      message.error("Xabarlarni yangilab bo‘lmadi");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
              {roleLabel}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-[#1f2d25]">Xabarlar</h1>
            <p className="mt-1 text-sm text-[#6d7a73]">
              CRM va tizimdan kelgan javoblar shu yerda ko‘rinadi.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Tag className="!m-0 !rounded-full !border-0 !bg-[#eaf6ef] !px-3 !py-1 !text-[#00863e]">
                {unreadCount} ta o‘qilmagan
              </Tag>
            )}
            <Button
              icon={<CheckCheck size={16} />}
              disabled={unreadCount === 0 || markAll.isPending}
              onClick={() => void onMarkAll()}
              className="!h-10 !rounded-full"
            >
              Hammasini o‘qish
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#e5e9e7] bg-white shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spin />
          </div>
        ) : isError ? (
          <div className="space-y-3 py-12 text-center">
            <p className="text-sm text-[#6d7a73]">Xabarlarni yuklab bo‘lmadi</p>
            <Button onClick={() => void refetch()}>Qayta urinish</Button>
          </div>
        ) : items.length === 0 ? (
          <Empty
            className="py-16"
            description="Hozircha xabar yo‘q. CRM javob berganda shu yerda chiqadi."
          />
        ) : (
          <ul className="divide-y divide-[#eef2f0]">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => void onMarkRead(item.id, item.isRead)}
                  className={`flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-[#f7faf8] sm:px-6 ${
                    item.isRead ? "bg-white" : "bg-[#f3faf6]"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      item.isRead
                        ? "bg-[#eef2f0] text-[#6d7a73]"
                        : "bg-[#eaf6ef] text-[#00863e]"
                    }`}
                  >
                    {item.isRead ? <MailOpen size={18} /> : <Bell size={18} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-[#1f2d25]">{item.title}</p>
                      <Tag className="!m-0 !rounded-full !border-0 !bg-[#eef2f0] !text-[#4d5a53]">
                        {typeLabel(item.type, item.entityType)}
                      </Tag>
                      {!item.isRead && (
                        <span className="h-2 w-2 rounded-full bg-[#00863e]" />
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[#6d7a73]">
                      {item.body}
                    </p>
                    <p className="mt-2 text-xs text-[#9aa59e]">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
