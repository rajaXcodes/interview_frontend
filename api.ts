import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const startInterview = async (token: string) => {
  const res = await api.post(
    "/start",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.sessionId;
};

export const askModel = async (
  sessionId: string,
  prmopt: string
): Promise<string> => {
  const res = await api.post(
    "/ask",
    { sessionId, prmopt },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data.reply;
};

//confirm endpoints
export const testCode = async (sessionId: string, code: string) => {
  const res = await api.post(
    "/testCode",
    { sessionId, code },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data.reply;
};

export const endInterview = async (sessionId: string) => {
  const res = await api.post(
    "/end",
    { sessionId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data.reply;
};
