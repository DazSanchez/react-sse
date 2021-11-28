import { useEffect, useState } from "react";
import { getDonationsAPI } from "../api/donations";
import { Donations } from "../types/donation";

export const useDonations = () => {
  const [donations, setDonations] = useState<Donations>({
    amount: 0,
    users: 0,
  });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Event | null>(null);

  useEffect(() => {
    const source = getDonationsAPI();

    source.addEventListener("open", () => {
      setReady(true);
    });

    source.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      setDonations(data);
    });

    source.addEventListener("error", (error) => {
      setError(error);
    });

    return () => {
      source.close();
      setReady(false);
    };
  }, []);

  return { data: donations, ready, error };
};
