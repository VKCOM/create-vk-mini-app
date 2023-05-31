declare module "eruda-dom" {
  import { Eruda, Tool } from "eruda";

  export default function <T extends Tool>(eruda: Eruda): T {}
}

declare module "eruda-code" {
  import { Eruda, Tool } from "eruda";

  export default function <T extends Tool>(eruda: Eruda): T {}
}
