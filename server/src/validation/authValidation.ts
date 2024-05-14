import vine from "@vinejs/vine";

export const registerSchema = vine.object({
  username: vine.string().minLength(2).maxLength(150),
  fullname: vine.string().minLength(2).maxLength(150),
  phoneNumber: vine.number().min(10).max(10),
  country: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(100).confirmed(),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(100),
});
