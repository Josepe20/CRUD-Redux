import { Button, Card, TextInput, Title, Badge } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions"
import { useState } from "react";

export function CreateNewUser () {
    const { addUser } = useUserActions();
    const [result, setResult] = useState<"ok" | "ko" | null>(null)

    const handleSubmit = (Event: React.FormEvent<HTMLFormElement>) => {
        Event.preventDefault();

        setResult(null)

        const form = Event.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const github = formData.get('github') as string;

        if (!name || !email || !github) {
            // validaciones que tu quieras
            return setResult("ko")
        }
        
        addUser({ name, email, github })
        setResult("ok")
        form.reset()
    };

    return (
        <Card style={{marginTop: "16px"}}>
            <Title>Create New User</Title>

            <form 
                onSubmit={handleSubmit}
                className=""
            >
                <TextInput
                    name="name"
                    placeholder="Nombre"
                />
                <TextInput
                    name="email"
                    placeholder="Email"
                />
                <TextInput
                    name="github"
                    placeholder="GitHub"
                />

                <div>
                    <Button
                        type="submit"
                        style={{ marginTop: "16px", backgroundColor: "blue", border: "1px solid #fff", color: "#fff" }}
                    >
                        Crear Usuario
                    </Button>
                </div>
                <span>
						{result === "ok" && (
							<Badge color='green'>Guardado correctamente</Badge>
						)}
						{result === "ko" && <Badge color='red'>Error con los campos</Badge>}
					</span>
            </form>
        </Card>
    )
}