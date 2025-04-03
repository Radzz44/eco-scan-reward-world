
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HistoryItem {
  id: number;
  date: string;
  wasteType: string;
  points: number;
}

interface RewardHistoryProps {
  history: HistoryItem[];
}

const RewardHistory = ({ history }: RewardHistoryProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-eco-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="flex justify-between items-center p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-eco-light flex items-center justify-center mr-3">
                  <span className="text-eco-primary font-medium text-sm">
                    +{item.points}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{item.wasteType}</div>
                  <div className="text-sm text-muted-foreground">{item.date}</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
          
          {history.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No activity recorded yet. Start scanning waste to earn points!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardHistory;
