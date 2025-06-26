
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const Blacklist = () => {
  const { t } = useLanguage();
  const [domain, setDomain] = useState('');
  const [reason, setReason] = useState('');

  // Sample blacklisted domains data
  const blacklistedDomains = [
    { domain: 'der-postillon.com', category: 'Satirical news sites' },
    { domain: 'theonion.com', category: 'Satirical news sites' },
    { domain: 'infowars.com', category: 'Known conspiracy/fake news sites' },
    { domain: 'naturalnews.com', category: 'Known conspiracy/fake news sites' },
    { domain: 'worldnewsdailyreport.com', category: 'Clickbait and unreliable sources' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitted:', { domain, reason });
    setDomain('');
    setReason('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('blacklist.title') || 'Publisher Blacklist'}</CardTitle>
            <CardDescription>{t('blacklist.description') || 'Domains and publishers identified as potentially harmful or unreliable sources of information.'}</CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">{t('blacklist.tabs.list') || 'Blacklisted Domains'}</TabsTrigger>
            <TabsTrigger value="add">{t('blacklist.tabs.add') || 'Request Addition'}</TabsTrigger>
            <TabsTrigger value="remove">{t('blacklist.tabs.remove') || 'Request Removal'}</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('blacklist.list.title') || 'Blacklisted Publishers'}</CardTitle>
                <CardDescription>{t('blacklist.list.description') || 'Currently tracking blacklisted domains across various categories.'}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('blacklist.table.domain') || 'Domain'}</TableHead>
                      <TableHead>{t('blacklist.table.category') || 'Category'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blacklistedDomains.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono">{item.domain}</TableCell>
                        <TableCell>{item.category}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('blacklist.add.title') || 'Request Domain Addition'}</CardTitle>
                <CardDescription>{t('blacklist.add.description') || 'Submit a request to add a domain to the blacklist. All requests are reviewed before implementation.'}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="domain">{t('blacklist.form.domain') || 'Domain'}</Label>
                    <Input
                      id="domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason">{t('blacklist.form.reason') || 'Reason for Addition'}</Label>
                    <Textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit">{t('blacklist.form.submit') || 'Submit Request'}</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="remove" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('blacklist.remove.title') || 'Request Domain Removal'}</CardTitle>
                <CardDescription>{t('blacklist.remove.description') || 'Submit a request to remove a domain from the blacklist. Please provide detailed justification for the removal.'}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="removeDomain">{t('blacklist.form.domain') || 'Domain'}</Label>
                    <Input
                      id="removeDomain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="removeReason">{t('blacklist.form.removeReason') || 'Justification for Removal'}</Label>
                    <Textarea
                      id="removeReason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit">{t('blacklist.form.submit') || 'Submit Request'}</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Blacklist;
