import type {
	BooleanNode,
	EnumNode,
	ObjectNode,
	StringNode,
	TypeNode,
} from "@fumadocs/story/type-tree";

export function createNode<T extends TypeNode["type"]>(
	type: T,
	options: Omit<Extract<TypeNode, { type: T }>, "type">,
): Extract<TypeNode, { type: T }> {
	return { type, ...options } as Extract<TypeNode, { type: T }>;
}

export function createStringNode(): StringNode {
	return createNode("string", {});
}

export function createBooleanNode(): BooleanNode {
	return createNode("boolean", {});
}

export function createObjectNode(
	...properties: ObjectNode["properties"]
): ObjectNode {
	return createNode("object", { properties });
}

export function createObjectProperty(
	name: string,
	type: TypeNode,
	required = false,
): ObjectNode["properties"][number] {
	return { name, required, type };
}

export function createEnumNode(...members: EnumNode["members"]): EnumNode {
	return createNode("enum", { members });
}
