import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IconUtils } from '../../../core/utils/icon.utils';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import {
  IAsset,
  IAssetCard,
  IAssetFlowNode,
  IRiskSummary,
  IVulnerability,
} from '../../../core/interfaces/asset.interface';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../../core/services/dashboard.service';
import { VulnerabilityTagGridComponent } from './vulnerability-tag-grid/vulnerability-tag-grid.component';
import { AssetCardComponent, IAssetCardData } from './asset-card/asset-card.component';
import { EndNodeCardComponent, IEndNodeCardData } from './end-node-card/end-node-card.component';

@Component({
  selector: 'app-asset-flow',
  imports: [CommonModule, CardComponent, VulnerabilityTagGridComponent, AssetCardComponent, EndNodeCardComponent],
  templateUrl: './asset-flow.component.html',
  styleUrl: './asset-flow.component.scss',
})
export class AssetFlowComponent implements OnInit, OnDestroy {
  assetFlow = signal<IAssetFlowNode[]>([]);
  assets = signal<IAsset[]>([]);
  riskSummary = signal<IRiskSummary>({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    total: 0,
  });
  showEntryHover = false;
  hoveredMiddleNode: string | null = null;
  hoveredEndNode: string | null = null;
  
  // Sample asset data for middle nodes
  middleNodeAssets: { [key: string]: IAssetCardData } = {
    '2': {
      name: 'WebServer-Prod-01',
      ipAddress: '192.168.1.3',
      icon: 'server',
      status: 'normal',
      metadata: [
        { label: 'Lorem', value: 'Lorem "Ipsum"', highlight: 'yellow' },
        { label: 'Loremipsum', value: 'Lorem 1234,5678', highlight: 'blue' }
      ]
    },
    '3': {
      name: 'Database-Main',
      ipAddress: '192.168.1.4',
      icon: 'server',
      status: 'error',
      metadata: [
        { label: 'Lorem', value: 'Lorem "Ipsum"', highlight: 'yellow' },
        { label: 'Loremipsum', value: 'Lorem 1234,5678', highlight: 'blue' }
      ]
    }
  };
  
  // Sample asset data for end nodes
  endNodeAssets: { [key: string]: IEndNodeCardData } = {
    '4': {
      name: 'Loremipsum',
      ipAddress: '1.2.3.4',
      icon: 'server',
      status: 'error',
      metadata: [
        { label: 'Lorem', value: 'Lorem "Ipsum"', highlight: 'yellow' },
        { value: 'Lorem', highlight: 'green' },
        { value: 'Loremipsum Loremipsum' },
        { value: '1.2.3.4', highlight: 'purple' },
        { value: 'Loremipsum' },
        { value: '1.2.3.4', highlight: 'purple' },
        { value: '1.2.3.4', highlight: 'purple' },
        { value: 'Lorem 1234,5678', highlight: 'blue' }
      ]
    },
    '5': {
      name: 'Loremipsum',
      ipAddress: '1.2.3.4',
      icon: 'server',
      status: 'error',
      metadata: [
        { label: 'Lorem', value: 'Lorem "Ipsum"', highlight: 'yellow' },
        { value: 'Loremipsum Loremipsum' },
        { value: '1.2.3.4', highlight: 'purple' },
        { value: '1.2.3.4', highlight: 'purple' },
        { value: 'Loremipsum Loremipsum' },
        { value: '1.2.3.4', highlight: 'purple' },
        { value: '1.2.3.4', highlight: 'purple' }
      ]
    }
  };
  
  riskLegend = [
    {
      icon: 'error-shield.svg',
      status: 'Critical',
      label: 'Lorem',
    },
    {
      icon: 'warning-shield.svg',
      status: 'High',
      label: 'Lorem',
    },
    {
      icon: 'success-shield.svg',
      status: 'Low',
      label: 'Lorem',
    },
  ];
  vulnerabilities = signal<IVulnerability[]>([]);
  assetCards = signal<IAssetCard[]>([]);
  private subscriptions = new Subscription();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  private loadData(): void {
    // Load current CVE

    // Load asset flow
    this.subscriptions.add(
      this.dashboardService.getAssetFlow().subscribe((data) => {
        this.assetFlow.set(data);
      })
    );

    // Load vulnerabilities
    this.subscriptions.add(
      this.dashboardService.getVulnerabilities().subscribe((data) => {
        this.vulnerabilities.set(data);
      })
    );

    // Load asset cards
    this.subscriptions.add(
      this.dashboardService.getAssetCards().subscribe((data) => {
        this.assetCards.set(data);
      })
    );
  }
  getIconClass(icon: string): string {
    return IconUtils.getIconClass(icon);
  }

  getRiskLevelColor(level: string): string {
    return IconUtils.getRiskLevelColor(level);
  }

  getNodeIconClass(node: IAssetFlowNode): string {
    if (node.type === 'entry') {
      return 'entry-node';
    } else if (node.type === 'end') {
      return 'end-node';
    }
    return 'middle-node';
  }

  getStatusIcon(riskLevel: string): string {
    switch (riskLevel) {
      case 'Critical':
        return 'error-shield.svg';
      case 'High':
        return 'warning-shield.svg';
      case 'Medium':
        return 'warning-shield.svg';
      default:
        return 'success-shield.svg';
    }
  }
}
