'use server';
import { verbose } from 'sqlite3';
import { Player } from '@/app/types';
import { getStatsSql, insertStatsSql, playersTableSql, statisticsTableSql } from '@/app/lib/sql';

function logError(err: Error | null) {
  if (err) {
    console.error(err.message);
  }
}

function getDb() {
  const sqlite3 = verbose();
  const db = new sqlite3.Database('./collection.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });
  db.run(playersTableSql, logError);
  db.run(statisticsTableSql, logError);
  return db;
}

export async function fetchPlayersFromDb(): Promise<Player[]> {
  const db = getDb();

  return new Promise((resolve, reject) => {
    const sql = `SELECT oid as id, name
                   from players
                   order by name`;

    db.all<Player>(sql, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
}

export async function savePlayer(name: string) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO players(name)
             VALUES (?)`,
      name,
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve('success');
        }
      }
    );
  });
}

export async function deletePlayer(name: string) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.run(
      `DELETE
             FROM players
             WHERE name = ?`,
      name,
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve('success');
        }
      }
    );
  });
}

export async function fetchPlayerStatistics(name: string): Promise<any> {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.all(getStatsSql, name, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
}

export async function savePlayerStatistics(player: string, description: string, count: number) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.run(insertStatsSql, [description, player, count], (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve('success');
      }
    });
  });
}
