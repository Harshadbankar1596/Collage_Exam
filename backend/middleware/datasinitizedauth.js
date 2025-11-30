const sanitizeObject = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }

    if (key.startsWith("$")) {
      delete obj[key];
    }

    if (key.includes(".")) {
      const newKey = key.replace(/\./g, "_");
      obj[newKey] = obj[key];
      delete obj[key];
    }
  }
};

export const mongoSanitizeMiddleware = (req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);
  next();
};
