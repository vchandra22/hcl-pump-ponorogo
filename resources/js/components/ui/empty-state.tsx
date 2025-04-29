import { AlertCircle } from "lucide-react";

export function EmptyState({
    title = 'No data found',
    description = 'There are currently no items to display',
    action
}: {
    title?: string;
    description?: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
