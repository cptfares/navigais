import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/agents/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/profile-overview/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { NotificationComponent } from '../../pages/notification/notification.component';

import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AddContainerComponent } from 'app/pages/add-container/add-container.component';
import { OverviewComponent } from 'app/pages/overview/overview.component';
import { SetupContainerComponent } from 'app/pages/setup-container/setup-container.component';
import { ArchiveComponent } from 'app/pages/archive/archive.component';
import { CollaborationComponent } from 'app/pages/collaboration/collaboration.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'setup_container',      component: SetupContainerComponent    },
    { path: 'collaboration',      component: CollaborationComponent   },
    { path: 'archive',      component: ArchiveComponent   },
    { path: 'overview',      component: OverviewComponent  },
    { path: 'add_container',           component: AddContainerComponent },
    { path: 'containers',          component: TableComponent },
    { path: 'agents',          component: UserComponent},
    { path: 'profil',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationComponent },
    { path: 'upgrade',        component: UpgradeComponent },

];

