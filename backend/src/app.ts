import cors from "cors";
import express, { Request, Response } from "express";

const PORT = 8080;
const SEND_INTERVAL = 2000;
const donation = {
  users: 0,
  amount: 0,
};

const app = express();
app.use(express.json());
app.use(cors());

app.post("/donate", async (req: Request, res: Response) => {
  const amount = req.body.amount || 0;

  if (amount > 0) {
    donation.amount += amount;
    donation.users += 1;
  }

  return res.json({
    message: "Thank you! 🙏",
  });
});

const writeEvent = (res: Response, sseId: string, data: string) => {
  res.write(`id: ${sseId}\n`);
  res.write(`data: ${data}\n\n`);
};

const sendEvent = (_req: Request, res: Response) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
  });

  const sseId = new Date().toDateString();

  setInterval(() => {
    writeEvent(res, sseId, JSON.stringify(donation));
  }, SEND_INTERVAL);
};

app.get("/dashboard", (req: Request, res: Response) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(req, res);
  } else {
    res.json({ message: "Ok" });
  }
});

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}`);
});
