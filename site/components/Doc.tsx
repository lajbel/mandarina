import Text from "./Text";
import doc from "../public/doc.json" assert { type: "json" };

interface DocProps {
    name: string;
}

// This works with interfaces
const InterfaceDoc: React.FC<DocProps> = (props: DocProps) => {
    const { name } = props;
    const type = doc.types[name as keyof typeof doc.types] as any;

    return (
        <>
            {Object.entries(type[0].type.members).map((member, i) => (
                <Text size="normal">{member[0]}:</Text>
            ))}
        </>
    );
};

const Doc: React.FC<DocProps> = (props: DocProps) => {
    const { name } = props;
    const type = doc.types[name as keyof typeof doc.types] as any;

    return (
        <>
            <Text size="huge">{name}</Text>
            <InterfaceDoc name={props.name}></InterfaceDoc>
        </>
    );
};

export default Doc;
