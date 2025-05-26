
import { PackageCheck, FileText, Receipt } from 'lucide-react';

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "$499",
    period: "One-time fee",
    description: "Perfect for first-time users exploring Turkish supply chain services",
    additionalInfo: "+ Bank transfer fees",
    icon: PackageCheck,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
    features: [
      "Single consolidated shipment",
      "Supplier payment handling",
      "Single Bill of Lading",
      "Documentation support"
    ]
  },
  {
    name: "Growth",
    price: "2%",
    period: "Of the total order value",
    description: "Our most popular option for growing businesses with regular shipments",
    additionalInfo: "+ Bank transfer fees",
    icon: FileText,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    features: [
      "Multiple consolidated shipments",
      "Digital procurement dashboard",
      "Real-time tracking",
      "Preferred shipping rates",
      "Payment handling & protection"
    ]
  },
  {
    name: "Enterprise",
    price: "1.5%",
    period: "After 5 consolidations/month",
    description: "For businesses with high-volume international shipping needs",
    additionalInfo: "Volume-based discounting after 5 consolidations/month",
    icon: Receipt,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    features: [
      "Volume discount pricing",
      "Priority consolidation",
      "Customized shipping schedule",
      "Advanced analytics & reporting",
      "Warehouse storage options",
      "Strategic sourcing assistance"
    ]
  }
];
