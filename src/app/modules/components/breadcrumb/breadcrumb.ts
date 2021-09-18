import { ActivatedRoute } from "@angular/router";

export type TBreadcrumbItemKind = "action" | "link" | "current";

export type TBreadcrumbItem = IBreadcrumbItemAcao | IBreadcrumbItemLink | IBreadcrumbItemAtual;

export interface IBreadcrumbItem {
  kind: TBreadcrumbItemKind;
  label: string;
}

export interface IBreadcrumbItemAcao extends IBreadcrumbItem {
  kind: "action";
  onClick: () => void;
}

export interface IBreadcrumbItemLink extends IBreadcrumbItem {
  kind: "link";
  navigation: string[];
  relativeTo?: ActivatedRoute;
}

export interface IBreadcrumbItemAtual extends IBreadcrumbItem {
  kind: "current";
}
