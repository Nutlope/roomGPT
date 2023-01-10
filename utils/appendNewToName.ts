export default function appendNewToName(name: string) {
  let insertPos = name.indexOf(".");
  let newName = name
    .substring(0, insertPos)
    .concat("-new", name.substring(insertPos));
  return newName;
}
