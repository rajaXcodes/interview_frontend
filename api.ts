import axios from "axios";

export const api = axios.create({
  baseURL: "https://algomentor-backend.onrender.com/"
});

export const login = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  return res.data.token;
};

export const startInterview = async (token: string) => {
  const res = await api.post(
    "/interview/start",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.sessionId;
};

export const askModel = async (
  sessionId: string,
  prompt: string,
  code: string
): Promise<string> => {
  let res: any;
  if (code) {
    res = await api.post(
      "/interview/ask",
      { sessionId, code },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } else if (prompt) {
    res = await api.post(
      "/interview/ask",
      { sessionId, prompt },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return res.data.reply;
};

export const testCode = async (sessionId: string, code: string) => {
  const res = await api.post(
    "/test/code",
    { sessionId, code },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data.reply;
};

export const endInterview = async (sessionId: string) => {
  const res = await api.post(
    "/interview/end",
    { sessionId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  // console.log(res.data);
  return res.data;
};
