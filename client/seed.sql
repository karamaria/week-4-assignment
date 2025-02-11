CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO messages (id, name, message, created_at) VALUES
(1, 'Anastasia', 'Absolutely amazing Golden Circle tour today with Savbbi !\r\nTo start with, he picked us up from a point that was convenient for us that wasn''t originally on the list.', '2025-01-31T14:33:48.705Z'),
(2, 'Brandon', 'Kind tour guide, made extra stops, took good care of us 😊  tour therefore also took a bit longer. Safe driving, good insights 😊\r\n\r\n', '2025-01-31T14:33:48.705Z'),
(3, 'Stella', 'Was a great experience. Wouldn’t advise for those with limited mobility as takes a bit of flexibility to get up into the jeep and through the caves (bending down quite far sometimes for a short walk). Recommend!', '2025-01-31T14:33:48.705Z');