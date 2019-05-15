import * as R from "ramda";

const formatDate = obj => {
  console.log("changeDate f");
  console.log(!!obj.birthDate);
  if (!obj.birthDate) {
    return obj;
  }
  let d = obj.birthDate;
  let newDate = "";
  if (obj.birthDate.length === 8) {
    newDate = d.slice(4, 6) + d.slice(6, 8) + d.slice(0, 4);
  } else if (obj.birthDate.length === 6) {
    newDate = d.slice(2, 4) + d.slice(4, 6) + d.slice(0, 2);
  }
  console.table({ ...obj, birthDate: newDate });
  return { ...obj, birthDate: newDate };
};

// parse a gift REQUEST all the way down to gift into a 2D row
//
export const parseGiftEventToGiftRequest2D = obj => {
  console.table(obj);
  const geUUID = R.prop("uuid", obj);
  const eventType = R.prop("eventType", obj);
  const eventMonth = R.prop("eventMonth", obj);
  const eventDay = R.prop("eventDay", obj);

  const partyFirst = R.path(["eventPersons", 0, "firstName"], obj);
  const partyLast = R.path(["eventPersons", 0, "lastName"], obj);
  const party = `${partyFirst} ${partyLast}`;
  let newRows = [];
  const createRequestRow = req => {
    let newObj = {
      eventType: eventType,
      party: party,
      request: req,
      eventMonth: eventMonth,
      eventDay: eventDay,
      eventDate: `${eventMonth}/${eventDay}`,
      geUUID: geUUID
    };
    newRows.push(newObj);
  };
  if (R.prop("eventGiftRequests", obj)) {
    let egr = R.prop("eventGiftRequests", obj);
    R.map(createRequestRow, egr);
  }
  return newRows;
};
export const parseGiftRequest2D = obj => {
  try {
    const geUUID = R.prop("geUUID", obj);
    const eventType = R.prop("eventType", obj);
    const eventMonth = R.prop("eventMonth", obj);
    const eventDay = R.prop("eventDay", obj);

    const party = R.prop("party", obj);
    let request = R.prop("request", obj);
    let newObj = {
      eventType: eventType,
      eventDate: `${eventMonth}/${eventDay}`,
      party: party,
      request: R.prop("requestNotes", request),
      id: R.prop("uuid", request),
      geUUID: geUUID,
      registryStatus: R.prop("registryStatus", request)
    };
    const gifts = R.prop("requestGifts", request);
    console.table(gifts);
    if (gifts) {
      const gift19 = R.find(x => R.propOr("", "giftYear")(x) === "2019", gifts)
        ? R.find(x => R.propOr("", "giftYear")(x) === "2019", gifts).gift[
            "description"
          ]
        : null;
      const gift19notes = R.find(
        x => R.propOr("", "giftYear")(x) === "2019",
        gifts
      )
        ? R.find(x => R.propOr("", "giftYear")(x) === "2019", gifts).gift[
            "giftNotes"
          ]
        : null;
      const gift18 = R.find(x => R.propOr("", "giftYear")(x) === "2018", gifts)
        ? R.find(x => R.propOr("", "giftYear")(x) === "2018", gifts).gift[
            "description"
          ]
        : null;
      const gift18notes = R.find(
        x => R.propOr("", "giftYear")(x) === "2018",
        gifts
      )
        ? R.find(x => R.propOr("", "giftYear")(x) === "2018", gifts).gift[
            "giftNotes"
          ]
        : null;

      const gift17 = R.find(x => R.propOr("", "giftYear")(x) === "2017", gifts)
        ? R.find(x => R.propOr("", "giftYear")(x) === "2017", gifts).gift[
            "description"
          ]
        : null;
      const gift17notes = R.find(
        x => R.propOr("", "giftYear")(x) === "2017",
        gifts
      )
        ? R.find(x => R.propOr("", "giftYear")(x) === "2017", gifts).gift[
            "giftNotes"
          ]
        : null;
      const statusGift19 = R.find(
        x => R.propOr("", "giftYear")(x) === "2019",
        gifts
      )
        ? R.find(x => R.propOr("", "giftYear")(x) === "2019", gifts).status
        : null;
      const gift19assignedTo = R.find(
        x => R.propOr("", "giftYear")(x) === "2019",
        gifts
      )
        ? R.find(x => R.propOr("", "giftYear")(x) === "2019", gifts).gift[
            "assignedTo"
          ]
        : "";
      const gift19UUID = R.find(
        x => R.propOr("", "giftYear")(x) === "2019",
        gifts
      )
        ? R.find(x => R.propOr("", "giftYear")(x) === "2019", gifts).gift[
            "uuid"
          ]
        : "";

      newObj = {
        ...newObj,
        gift19: gift19,
        gift19notes: gift19notes,
        gift18: gift18,
        gift18notes: gift18notes,
        gift17: gift17,
        gift17notes: gift17notes,
        status: statusGift19,
        assignedTo: gift19assignedTo,
        giftUUID: gift19UUID
      };
    }
    return newObj;
  } catch (e) {
    console.log("CATCH " + e.message);
  }
};
