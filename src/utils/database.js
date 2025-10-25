import * as SQLite from "expo-sqlite";
import { Place } from "../models/places";

const database = SQLite.openDatabaseSync("places.db");

export async function init() {
  try {
    await database.withExclusiveTransactionAsync(async (tx) => {
      // Drop the old table if it exists (for development)
      await tx.execAsync(`DROP TABLE IF EXISTS places;`);

      // Create the table with the correct schema
      await tx.execAsync(`
        CREATE TABLE IF NOT EXISTS places (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        );
      `);
    });
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  }
}

export async function insertPlace(place) {
  try {
    await database.withExclusiveTransactionAsync(async (tx) => {
      await tx.runAsync(
        `INSERT INTO places (id, title, imageUri, address, lat, lng)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          place.id,
          place.title,
          place.imageUri,
          place.location.address,
          place.location.lat,
          place.location.lng,
        ]
      );
    });
  } catch (error) {
    console.error("❌ Error inserting place:", error);
    throw error;
  }
}

export async function getPlaces() {
  try {
    const result = await database.getAllAsync("SELECT * FROM places");
    const places = [];
    for (const dp of result) {
      places.push(
        new Place(
          dp.title,
          dp.imageUri,
          {
            address: dp.address,
            lat: dp.lat,
            lng: dp.lng,
          },
          dp.id
        )
      );
    }
    return places || [];
  } catch (error) {
    console.error("❌ Error fetching places:", error);
    return [];
  }
}

export async function fetchPlaceDetails(id) {
  try {
    const result = await database.getFirstAsync(
      "SELECT * FROM places WHERE id = ?",
      [id]
    );

    if (!result) {
      return null;
    }

    const place = new Place(
      result.title,
      result.imageUri,
      {
        address: result.address,
        lat: result.lat,
        lng: result.lng,
      },
      result.id
    );

    return place;
  } catch (error) {
    console.error("❌ Error fetching place details:", error);
    throw error;
  }
}

export async function deletePlace(id) {
  try {
    await database.withExclusiveTransactionAsync(async (tx) => {
      await tx.runAsync("DELETE FROM places WHERE id = ?", [id]);
    });
  } catch (error) {
    console.error("❌ Error deleting place:", error);
    throw error;
  }
}
