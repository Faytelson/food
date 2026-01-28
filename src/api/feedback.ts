import supabase from "./baseClient";

export type MessageData = {
  name: string;
  phone: string;
};

export const fetchFeedback = async (data: MessageData) => {
  const { error } = await supabase.from("messages").insert([
    {
      name: data.name,
      phone: data.phone,
    },
  ]);

  if (error) {
    console.error("Ошибка отправки:", error);
    return false;
  }

  return true;
};
