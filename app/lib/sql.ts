export const statisticsTableSql = `CREATE TABLE IF NOT EXISTS statistics
                                   (
                                       description TEXT,
                                       player      TEXT,
                                       count       INTEGER DEFAULT 0,
                                       FOREIGN KEY (player) REFERENCES players (name),
                                       UNIQUE (description, player)
                                   )
`;
export const playersTableSql = `CREATE TABLE IF NOT EXISTS players
                                (
                                    name TEXT UNIQUE
                                )`;
export const insertStatsSql = `INSERT INTO statistics(description, player, count)
                               VALUES (?, ?, ?)`;
export const getStatsSql = `SELECT *
                            from statistics
                            WHERE player = ?`;
