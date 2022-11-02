-- created_at
ALTER TABLE ONLY employee ADD COLUMN "created_at" TIMESTAMP DEFAULT NOW();      

-- updated_at
ALTER TABLE ONLY employee
ADD COLUMN "updated_at" TIMESTAMP DEFAULT NOW();

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE
UPDATE ON employee
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();