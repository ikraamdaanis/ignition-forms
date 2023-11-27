"use client";

import { Button } from "components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "components/ui/table";
import { Content, Form, FormSubmission } from "database/schema";
import { useEditorLinks } from "features/editor/hooks/useEditorLinks";
import { ArrowRight, Edit } from "lucide-react";
import Link from "next/link";

type Props = {
  form: Form;
  formSubmissions: FormSubmission[];
};

/**
 * Dashboard for an individual form. Contains links to the editor and
 * to view form submissions.
 */
export const FormDashboard = ({ form, formSubmissions }: Props) => {
  const { editorLink } = useEditorLinks();

  const content = JSON.parse(form.content || "") as Content;
  const formFields = content.formFields;

  return (
    <div className="flex min-h-full w-full flex-col bg-white pt-[50px] dark:bg-zinc-900">
      <div className="flex items-center gap-2 p-4">
        <Button asChild className="text-md mt-2 w-full gap-4">
          <Link href={`/forms/${form.id}`} target="_blank">
            View Form <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="text-md mt-2 w-full gap-4 border border-zinc-300 bg-zinc-50 hover:bg-zinc-50 hover:brightness-110 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-900"
        >
          <Link href={`${editorLink}/${form.id}`}>
            Edit Form <Edit className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">ID</TableHead>
              {formFields?.map(field => {
                return <TableHead key={field}>{field}</TableHead>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {formSubmissions.map(submission => {
              const fields = JSON.parse(submission.content || "");

              return (
                <TableRow key={submission.id}>
                  <TableCell>{submission.id.slice(0, 4)}</TableCell>
                  {formFields?.map(field => {
                    const fieldData = fields?.[field];

                    return <TableCell key={field}>{fieldData}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
