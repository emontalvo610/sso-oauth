'use client';

interface IFormProps {
  email: string;
}

export default function ProfileForm(props: IFormProps) {
  return <>Profile: {props.email}</>;
}
