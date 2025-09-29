-- Migration: Add isFromIKMExpo column to users table for IKM Expo campaign
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS "isFromIKMExpo" BOOLEAN DEFAULT FALSE;